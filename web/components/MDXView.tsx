import dynamic from "next/dynamic";
import React from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

export default function MDXView({ source }: { source: string }) {
  return (
    <article className="prose prose-slate max-w-none">
      
      <MDXRemote source={source} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
    </article>
  );
}


