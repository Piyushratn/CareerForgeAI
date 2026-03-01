"use client";

import dynamic from "next/dynamic";

// ✅ Load only in browser (important for Vercel)
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
});

const CoverLetterPreview = ({ content }) => {
  return (
    <div className="py-4" data-color-mode="light">
      <MDEditor
        value={content}
        preview="preview"
        height={700}
      />
    </div>
  );
};

export default CoverLetterPreview;