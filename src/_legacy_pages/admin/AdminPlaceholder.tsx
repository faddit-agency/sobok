type Props = { title: string; note: string }

export function AdminPlaceholder({ title, note }: Props) {
  return (
    <div>
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="mt-3 max-w-2xl text-sm text-neutral-600">{note}</p>
      <p className="mt-4 text-xs text-neutral-400">
        이 화면은 골격입니다. DB·RLS·실제 연동이 준비된 항목만 완료된 것으로 표시합니다.
      </p>
    </div>
  )
}
