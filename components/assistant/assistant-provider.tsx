"use client";

import dynamic from "next/dynamic";
import { type ComponentProps, type ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const AssistantChat = dynamic(() => import("./assistant-chat"), {
  ssr: false,
  loading: () => (
    <output className="p-6 text-sm text-muted-foreground">
      Opening your portfolio guide…
    </output>
  ),
});

export function AssistantProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [visited, setVisited] = useState(false);
  return (
    <Sheet
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (next) setVisited(true);
      }}
    >
      {children}
      <AssistantTrigger className="fixed right-5 bottom-5 z-40 h-12 gap-3 rounded-full border border-primary-foreground/15 px-5 text-xs shadow-lg sm:right-8 sm:bottom-7">
        <span aria-hidden="true" className="text-2xl text-brand-soft">
          ✳
        </span>
        Ask about Nirbhay
        <span className="rounded border border-primary-foreground/30 px-1.5 py-0.5 font-mono text-[0.5625rem]">
          AI
        </span>
      </AssistantTrigger>
      <SheetContent
        keepMounted={visited}
        className="gap-0 bg-background data-[side=right]:h-dvh data-[side=right]:w-full data-[side=right]:sm:max-w-[29rem] motion-reduce:transition-none"
      >
        <SheetHeader className="shrink-0 border-b px-6 py-6 pr-12">
          <SheetTitle className="flex items-center gap-3 text-base">
            <span
              aria-hidden="true"
              className="text-3xl font-normal text-brand"
            >
              ✳
            </span>
            Nirbhay’s portfolio guide
          </SheetTitle>
          <SheetDescription className="text-xs">
            Experience, projects & the person behind them
          </SheetDescription>
        </SheetHeader>
        {visited && <AssistantChat onNavigate={() => setOpen(false)} />}
      </SheetContent>
    </Sheet>
  );
}

export function AssistantTrigger(props: ComponentProps<typeof Button>) {
  return <SheetTrigger render={<Button {...props} />} />;
}
