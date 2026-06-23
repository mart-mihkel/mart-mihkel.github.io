import type { ParentComponent } from "solid-js";

const RfcLayout: ParentComponent = (props) => {
  return (
    <div class="min-h-dvh bg-stone-100 text-stone-900">
      <main class="mx-auto max-w-[72ch] px-6 py-16 font-mono text-sm leading-relaxed">
        {props.children}
      </main>
    </div>
  );
};

export default RfcLayout;
