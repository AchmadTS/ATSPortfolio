export const markdownComponents = {
  // eslint-disable-next-line no-unused-vars
  a: ({ node, ...props }) => (
    <a
      {...props}
      className="text-teal-400 underline hover:text-teal-300"
      target="_blank"
      rel="noopener noreferrer"
    />
  ),
  // eslint-disable-next-line no-unused-vars
  strong: ({ node, ...props }) => (
    <strong className="font-semibold text-white" {...props} />
  ),
  // eslint-disable-next-line no-unused-vars
  p: ({ node, ...props }) => <p className="mb-3 leading-relaxed" {...props} />,
  // eslint-disable-next-line no-unused-vars
  ul: ({ node, ...props }) => (
    <ul className="list-disc pl-5 my-3 space-y-2" {...props} />
  ),
  // eslint-disable-next-line no-unused-vars
  ol: ({ node, ...props }) => (
    <ol className="list-decimal pl-5 my-3 space-y-2" {...props} />
  ),
  // eslint-disable-next-line no-unused-vars
  li: ({ node, ...props }) => <li className="pl-1" {...props} />,
  // eslint-disable-next-line no-unused-vars
  table: ({ node, ...props }) => (
    <div className="overflow-x-auto my-4 border border-white/20 rounded-lg">
      <table className="w-full text-sm text-left border-collapse" {...props} />
    </div>
  ),
  // eslint-disable-next-line no-unused-vars
  th: ({ node, ...props }) => (
    <th
      className="bg-white/10 px-4 py-3 border-b border-white/20 text-orange font-bold uppercase tracking-wider"
      {...props}
    />
  ),
  // eslint-disable-next-line no-unused-vars
  td: ({ node, ...props }) => (
    <td
      className="px-4 py-3 border-b border-white/10 text-white/80"
      {...props}
    />
  ),
};