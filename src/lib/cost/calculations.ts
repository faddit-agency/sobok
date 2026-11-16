/**
 * SOBOK 원가 계산 규칙 (명세 §17)
 * 기존 계산기 소스가 저장소에 없어 명세 기준으로 신규 구현.
 * 계산 기준: 1yd = 90cm (기존 시스템 호환, 국제 91.44cm로 임의 변경하지 않음)
 */

export const YD_TO_CM = 90

export type CostInputs = {
  fabricWidthCm: number
  fabricLengthYd: number
  pricePerYd: number
  finishedWidthCm: number
  finishedHeightCm: number
  seamAllowanceCm: number
  productionTarget: number
  laborMode: "manual" | "auto"
  manualLaborPerUnit?: number
  workers?: number
  capacityPerWorker?: number
  dailyWage?: number
  suppliesLabel?: number
  suppliesPack?: number
  suppliesOther?: number
  finishingItems?: { checked: boolean; unitPrice: number; quantity: number }[]
  extraCosts?: {
    checked: boolean
    type: "fixed_per_unit" | "percent_of_direct"
    amount: number
  }[]
  marginMode: "rate" | "price"
  marginRate?: number
  sellPrice?: number
  orderQty: number
}

export type CostResult = {
  ok: boolean
  errors: string[]
  cutWidth: number
  cutHeight: number
  rollPrice: number
  yieldStraight: number
  yieldRotated: number
  yieldPerRoll: number
  fabricCost: number
  laborPerUnit: number
  suppliesSum: number
  finishingSum: number
  directCost: number
  extraSum: number
  totalUnitCost: number
  sellPrice: number
  marginRate: number
  profitPerUnit: number
  isLoss: boolean
  totalRevenue: number
  totalProfit: number
  rollsNeeded: number
  rollPurchaseAmount: number
  estimatedProduction: number
  excessPossible: number
  note: string
}

function isPositive(n: number) {
  return Number.isFinite(n) && n > 0
}

function isNonNeg(n: number) {
  return Number.isFinite(n) && n >= 0
}

export function ceil(n: number) {
  return Math.ceil(n)
}

export function roundUpTo100(n: number) {
  return Math.ceil(n / 100) * 100
}

export function ydToCm(yd: number) {
  return yd * YD_TO_CM
}

export function cmToYd(cm: number) {
  return cm / YD_TO_CM
}

export function calculateCost(input: CostInputs): CostResult {
  const errors: string[] = []
  const empty: CostResult = {
    ok: false,
    errors,
    cutWidth: 0,
    cutHeight: 0,
    rollPrice: 0,
    yieldStraight: 0,
    yieldRotated: 0,
    yieldPerRoll: 0,
    fabricCost: 0,
    laborPerUnit: 0,
    suppliesSum: 0,
    finishingSum: 0,
    directCost: 0,
    extraSum: 0,
    totalUnitCost: 0,
    sellPrice: 0,
    marginRate: 0,
    profitPerUnit: 0,
    isLoss: false,
    totalRevenue: 0,
    totalProfit: 0,
    rollsNeeded: 0,
    rollPurchaseAmount: 0,
    estimatedProduction: 0,
    excessPossible: 0,
    note: "계산 기준 1yd = 90cm. 위 수율은 단일 방향 배치 비교이며 혼합 배치 최적 수율이 아닙니다.",
  }

  if (!isPositive(input.fabricWidthCm)) errors.push("원단 폭은 양수여야 합니다.")
  if (!isPositive(input.fabricLengthYd)) errors.push("원단 길이는 양수여야 합니다.")
  if (!isNonNeg(input.pricePerYd)) errors.push("야드당 단가는 0 이상이어야 합니다.")
  if (!isPositive(input.finishedWidthCm) || !isPositive(input.finishedHeightCm)) {
    errors.push("완성 가로·세로는 양수여야 합니다.")
  }
  if (!isNonNeg(input.seamAllowanceCm)) errors.push("시접은 0 이상이어야 합니다.")
  if (!Number.isInteger(input.productionTarget) || input.productionTarget <= 0) {
    errors.push("생산목표는 양의 정수여야 합니다.")
  }
  if (!Number.isInteger(input.orderQty) || input.orderQty <= 0) {
    errors.push("발주 수량은 양의 정수여야 합니다.")
  }
  if (input.marginMode === "rate") {
    const r = input.marginRate ?? -1
    if (!(r >= 0 && r < 100)) errors.push("마진율은 0 이상 100 미만이어야 합니다.")
  }
  if (input.marginMode === "price" && (input.sellPrice === undefined || input.sellPrice < 0)) {
    errors.push("판매가는 0 이상이어야 합니다.")
  }
  if (input.laborMode === "auto") {
    if (!input.workers || input.workers <= 0 || !Number.isInteger(input.workers)) {
      errors.push("작업 인원은 양의 정수여야 합니다.")
    }
    if (!input.capacityPerWorker || input.capacityPerWorker <= 0) {
      errors.push("인당 생산 capa는 양수여야 합니다.")
    }
    if (input.dailyWage === undefined || input.dailyWage < 0) {
      errors.push("일급은 0 이상이어야 합니다.")
    }
  }

  if (errors.length) return empty

  const cutWidth = input.finishedWidthCm + input.seamAllowanceCm * 2
  const cutHeight = input.finishedHeightCm + input.seamAllowanceCm * 2
  const fabricLengthCm = ydToCm(input.fabricLengthYd)
  const rollPrice = input.pricePerYd * input.fabricLengthYd

  const yieldStraight =
    Math.floor(input.fabricWidthCm / cutWidth) * Math.floor(fabricLengthCm / cutHeight)
  const yieldRotated =
    Math.floor(input.fabricWidthCm / cutHeight) * Math.floor(fabricLengthCm / cutWidth)
  const yieldPerRoll = Math.max(yieldStraight, yieldRotated)

  if (yieldPerRoll <= 0) {
    errors.push("수율이 0입니다. 재단 크기와 원단 규격을 확인하세요.")
    return { ...empty, errors, cutWidth, cutHeight, rollPrice, yieldStraight, yieldRotated, yieldPerRoll }
  }

  const fabricCost = ceil(rollPrice / yieldPerRoll)

  let laborPerUnit = 0
  if (input.laborMode === "manual") {
    laborPerUnit = ceil(input.manualLaborPerUnit ?? 0)
  } else {
    const workers = input.workers!
    const daily = workers * input.capacityPerWorker!
    const workDays = ceil(input.productionTarget / daily)
    laborPerUnit = ceil((workDays * workers * (input.dailyWage ?? 0)) / input.productionTarget)
  }

  const suppliesSum =
    (input.suppliesLabel ?? 0) + (input.suppliesPack ?? 0) + (input.suppliesOther ?? 0)
  const finishingSum = (input.finishingItems ?? [])
    .filter((i) => i.checked)
    .reduce((sum, i) => sum + i.unitPrice * i.quantity, 0)

  const suppliesAndLabor = suppliesSum + laborPerUnit
  const directCost = fabricCost + suppliesAndLabor + finishingSum

  const extraSum = (input.extraCosts ?? [])
    .filter((e) => e.checked)
    .reduce((sum, e) => {
      if (e.type === "fixed_per_unit") return sum + ceil(e.amount)
      return sum + ceil((directCost * e.amount) / 100)
    }, 0)

  const totalUnitCost = directCost + extraSum

  let sellPrice = 0
  let marginRate = 0

  if (input.marginMode === "rate") {
    const r = input.marginRate ?? 0
    sellPrice = roundUpTo100(totalUnitCost / (1 - r / 100))
    marginRate = sellPrice === 0 ? NaN : ((sellPrice - totalUnitCost) / sellPrice) * 100
  } else {
    sellPrice = input.sellPrice ?? 0
    if (sellPrice === 0) {
      marginRate = NaN
    } else {
      marginRate = ((sellPrice - totalUnitCost) / sellPrice) * 100
    }
  }

  const profitPerUnit = Number.isFinite(marginRate) || sellPrice > 0 ? sellPrice - totalUnitCost : 0
  const isLoss = sellPrice > 0 && sellPrice < totalUnitCost
  const rollsNeeded = ceil(input.orderQty / yieldPerRoll)
  const rollPurchaseAmount = rollsNeeded * rollPrice
  const estimatedProduction = rollsNeeded * yieldPerRoll
  const excessPossible = estimatedProduction - input.orderQty

  return {
    ok: true,
    errors: [],
    cutWidth,
    cutHeight,
    rollPrice,
    yieldStraight,
    yieldRotated,
    yieldPerRoll,
    fabricCost,
    laborPerUnit,
    suppliesSum,
    finishingSum,
    directCost,
    extraSum,
    totalUnitCost,
    sellPrice,
    marginRate: Number.isFinite(marginRate) ? marginRate : NaN,
    profitPerUnit,
    isLoss,
    totalRevenue: sellPrice * input.orderQty,
    totalProfit: profitPerUnit * input.orderQty,
    rollsNeeded,
    rollPurchaseAmount,
    estimatedProduction,
    excessPossible,
    note: empty.note,
  }
}
