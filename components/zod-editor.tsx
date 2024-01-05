import YamlEditor from "@focus-reactive/react-yaml";
import { useState } from "react";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { useToast } from "./ui/use-toast";
import dynamic from "next/dynamic";

const JSONEditor = dynamic(() => import("@/components/json-editor"), {
  ssr: false,
});
const zodPlaceHolder = z.object({});
zodPlaceHolder.parse({});

const ZOD_CODE = `z.object({
    guestListName: z.string(),
    invitedGuests: z
      .array(
        z.object({
          name: z.string(),
          age: z.coerce.number(),
        })
      )
      .describe("Guests invited to the party"),
});`;

function ZodEditor({
  schema,
  onChange,
}: {
  schema: any;
  onChange?: (jsonData: any) => void;
}) {
  const [mode, setMode] = useState<"json" | "yaml" | "zod">("json");
  const toast = useToast();
  const convertToZod = (schema: any) => {
    try {
      const json = zodToJsonSchema(eval(schema.target.value));
      onChange &&
        onChange({
          steps: [
            {
              label: "Step 1",
              stepIcon: "Shield",
              formSchema: json,
            },
          ],
        });
    } catch (error: any) {
      toast.toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <ToggleGroup
          type="single"
          onValueChange={(value) => {
            setMode(value as any);
          }}
        >
          <ToggleGroupItem value="json" aria-label="Toggle bold">
            <Label>JSON</Label>
          </ToggleGroupItem>
          <ToggleGroupItem value="yaml" aria-label="Toggle italic">
            <Label>YAML</Label>
          </ToggleGroupItem>
          <ToggleGroupItem value="zod" aria-label="Toggle underline">
            <Label>Zod Code</Label>
          </ToggleGroupItem>
        </ToggleGroup>
        <Button
          variant={"outline"}
          onClick={() => {
            // delete from local storage
            localStorage.removeItem("schema");
            window.location.reload();
          }}
        >
          Reset
        </Button>
      </div>
      {mode == "json" ? (
        <JSONEditor
          jsonData={schema}
          mode="code"
          onChange={(result) => {
            try {
              JSON.parse(JSON.stringify(result.json));
              onChange && onChange(result.json);
            } catch (error: any) {
              console.log(error);
            }
          }}
        />
      ) : null}
      {mode == "yaml" ? (
        <div className="h-full">
          <YamlEditor
            json={schema}
            onChange={(result) => {
              try {
                JSON.parse(JSON.stringify(result.json));
                onChange && onChange(result.json);
              } catch (error: any) {
                console.log(error);
              }
            }}
            onError={(error: any) => {
              console.log(error);
            }}
          />
        </div>
      ) : null}
      {mode == "zod" ? (
        <div className="space-y-2">
          <Textarea
            defaultValue={ZOD_CODE}
            className="min-h-[400px]"
            onChange={convertToZod}
            onKeyDown={(e) => {
              if (e.key === "Tab") {
                e.preventDefault();
                const start = e.currentTarget.selectionStart;
                const end = e.currentTarget.selectionEnd;
                e.currentTarget.value =
                  e.currentTarget.value.substring(0, start) +
                  "\t" +
                  e.currentTarget.value.substring(end);
                e.currentTarget.selectionStart = e.currentTarget.selectionEnd =
                  start + 1;
              }
            }}
          />
          <Label>This is one way (from zod code to JSON / YAML)</Label>
        </div>
      ) : null}
    </div>
  );
}

export default ZodEditor;
