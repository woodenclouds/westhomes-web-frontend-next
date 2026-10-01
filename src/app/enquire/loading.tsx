import {
  EnquiryFormSkeleton,
  PageIntroSkeleton,
} from "@/components/skeletons";

export default function EnquireLoading() {
  return (
    <div className="section-space" aria-busy="true" aria-label="Loading enquiry">
      <div className="container-page grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <PageIntroSkeleton titleWidth="w-80" />
        <EnquiryFormSkeleton />
      </div>
      <span className="sr-only">Loading enquiry form…</span>
    </div>
  );
}
