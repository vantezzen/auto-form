import { cn } from "@/lib/utils";

function Json({ data, className }: { data: any; className?: string }) {
  return (
    <div className={cn("rounded-lg p-3 bg-zinc-100 font-mono", className)}>
      <pre className="text-sm">{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default Json;
