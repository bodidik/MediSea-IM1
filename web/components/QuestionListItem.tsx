export default function QuestionListItem({
  item,
  onClick,
}: {
  item: any;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        textAlign: 'left',
        border: '1px solid #e5e7eb',
        borderRadius: 10,
        padding: 10,
        width: '100%',
        background: 'white',
      }}
    >
      <div style={{ fontWeight: 600 }}>{item.stem}</div>
      <div style={{ opacity: 0.7, marginTop: 4, fontSize: 12 }}>
        Konu: {item.subject?.toUpperCase()}
      </div>
    </button>
  );
}


