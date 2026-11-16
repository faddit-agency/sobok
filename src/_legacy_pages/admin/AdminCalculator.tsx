import { useMemo, useState } from "react"
import { calculateCost, type CostInputs, YD_TO_CM } from "../../lib/cost/calculations"

export function AdminCalculator() {
  const [input, setInput] = useState<CostInputs>({
    fabricWidthCm: 150,
    fabricLengthYd: 50,
    pricePerYd: 3000,
    finishedWidthCm: 70,
    finishedHeightCm: 70,
    seamAllowanceCm: 1,
    productionTarget: 100,
    laborMode: "manual",
    manualLaborPerUnit: 500,
    suppliesLabel: 50,
    suppliesPack: 100,
    suppliesOther: 0,
    finishingItems: [],
    extraCosts: [],
    marginMode: "rate",
    marginRate: 30,
    orderQty: 100,
  })

  const result = useMemo(() => calculateCost(input), [input])

  const setNum = (key: keyof CostInputs, value: string) => {
    const n = Number(value)
    setInput((prev) => ({ ...prev, [key]: Number.isFinite(n) ? n : 0 }))
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold">원가 계산</h1>
      <p className="mt-2 text-sm text-neutral-600">
        계산 기준 1yd = {YD_TO_CM}cm. 저장소에 기존 계산기 소스가 없어 명세 §17 규칙으로 신규 구현했습니다.
        이 총이익은 입력 원가 항목 기준의 계산상 이익이며 회사 순이익이 아닙니다.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="space-y-3 rounded border border-neutral-200 bg-white p-4 text-sm">
          {(
            [
              ["fabricWidthCm", "원단 폭 (cm)"],
              ["fabricLengthYd", "원단 길이 (yd)"],
              ["pricePerYd", "야드당 단가"],
              ["finishedWidthCm", "완성 가로 (cm)"],
              ["finishedHeightCm", "완성 세로 (cm)"],
              ["seamAllowanceCm", "시접 (cm)"],
              ["productionTarget", "생산목표 (장)"],
              ["manualLaborPerUnit", "장당 공임 (직접입력)"],
              ["suppliesLabel", "라벨"],
              ["suppliesPack", "포장"],
              ["suppliesOther", "기타 부자재"],
              ["marginRate", "마진율 (%)"],
              ["orderQty", "발주 수량"],
            ] as [keyof CostInputs, string][]
          ).map(([key, label]) => (
            <label key={key} className="grid grid-cols-[10rem_1fr] items-center gap-2">
              <span>{label}</span>
              <input
                type="number"
                className="border px-2 py-1.5"
                value={Number(input[key] ?? 0)}
                onChange={(e) => setNum(key, e.target.value)}
              />
            </label>
          ))}
        </div>

        <div className="rounded border border-neutral-200 bg-white p-4 text-sm">
          {!result.ok ? (
            <ul className="list-disc space-y-1 pl-5 text-red-700">
              {result.errors.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          ) : (
            <dl className="space-y-2">
              <div className="flex justify-between"><dt>재단 가로×세로</dt><dd>{result.cutWidth} × {result.cutHeight}</dd></div>
              <div className="flex justify-between"><dt>정방향 수율</dt><dd>{result.yieldStraight}</dd></div>
              <div className="flex justify-between"><dt>회전 수율</dt><dd>{result.yieldRotated}</dd></div>
              <div className="flex justify-between"><dt>롤당 수율</dt><dd>{result.yieldPerRoll}</dd></div>
              <div className="flex justify-between"><dt>원단비</dt><dd>{result.fabricCost.toLocaleString()}원</dd></div>
              <div className="flex justify-between"><dt>장당 공임</dt><dd>{result.laborPerUnit.toLocaleString()}원</dd></div>
              <div className="flex justify-between"><dt>직접원가</dt><dd>{result.directCost.toLocaleString()}원</dd></div>
              <div className="flex justify-between"><dt>총제작원가</dt><dd>{result.totalUnitCost.toLocaleString()}원</dd></div>
              <div className="flex justify-between font-medium"><dt>판매가</dt><dd>{result.sellPrice.toLocaleString()}원</dd></div>
              <div className="flex justify-between"><dt>마진율</dt><dd>{Number.isFinite(result.marginRate) ? `${result.marginRate.toFixed(2)}%` : "계산 불가"}</dd></div>
              <div className="flex justify-between"><dt>장당이익</dt><dd className={result.isLoss ? "text-red-700" : ""}>{result.profitPerUnit.toLocaleString()}원{result.isLoss ? " (손실)" : ""}</dd></div>
              <div className="flex justify-between"><dt>필요 롤</dt><dd>{result.rollsNeeded}</dd></div>
              <div className="flex justify-between"><dt>롤 구매액 (보조)</dt><dd>{result.rollPurchaseAmount.toLocaleString()}원</dd></div>
              <div className="flex justify-between"><dt>예상 생산 가능</dt><dd>{result.estimatedProduction}장</dd></div>
              <p className="pt-3 text-xs text-neutral-500">{result.note}</p>
            </dl>
          )}
        </div>
      </div>
    </div>
  )
}
