 const PostDetailsTable = ({ details }: { details: [string, string | number | undefined][] }) => (
  <div className="border-t pt-6 mt-4 divide-y divide-border">
    {details.map(([label, value], idx) => (
      <div key={idx} className="flex justify-between py-3 text-sm">
        <span className="text-muted-foreground whitespace-nowrap">{label}</span>
        <span className="text-right whitespace-nowrap">{value || '-'}</span>
      </div>
    ))}
  </div>
);

export default PostDetailsTable;
