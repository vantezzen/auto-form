import JSONEditor, { JSONEditorOptions } from "jsoneditor";
import "jsoneditor/dist/jsoneditor.css";
import React, { useEffect, useRef } from "react";
import { Card } from "./ui/card";

interface JSONEditorComponentProps {
  jsonData: any;
  modes?: JSONEditorOptions["modes"];
  mode: JSONEditorOptions["mode"];
  onChange?: (jsonData: any) => void;
}

const JSONEditorComponent: React.FC<JSONEditorComponentProps> = ({
  jsonData,
  onChange,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const jsonEditorRef = useRef<JSONEditor | null>(null); // useRef to persist the JSONEditor instance

  useEffect(() => {
    if (!containerRef.current) return;

    const options: JSONEditorOptions = {
      mode: "code",
      modes: ["code", "tree"],
      onChangeText: (jsonString) => {
        try {
          const json = JSON.parse(jsonString);
          if (onChange) {
            onChange(json);
          }
        } catch (error: any) {
          console.error(error.message);
        }
      },
    };

    // Initialize JSONEditor only if it's not already initialized
    if (!jsonEditorRef.current) {
      jsonEditorRef.current = new JSONEditor(containerRef.current, options);
    }

    return () => {
      // Cleanup JSONEditor on component unmount
      if (jsonEditorRef.current) {
        jsonEditorRef.current.destroy();
        jsonEditorRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    // Update JSON data without re-initializing the editor
    if (jsonEditorRef.current) {
      jsonEditorRef.current.update(jsonData);
    }
  }, [jsonData]); // Dependency on jsonData for updates

  return (
    <Card>
      <div ref={containerRef} style={{ width: "100%", height: "600px" }} />
    </Card>
  );
};

export default JSONEditorComponent;
