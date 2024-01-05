"use client";

import StepperWrapper, { StepperSchema } from "@/components/StepperWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import ZodEditor from "@/components/zod-editor";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

const JSONEditor = dynamic(() => import("@/components/json-editor"), {
  ssr: false,
});

export default function Home() {
  const resultRef = React.useRef<HTMLDivElement | null>(null);
  const [schema, setSchema] = useState<StepperSchema>({
    steps: [
      {
        label: "Personal Information",
        stepIcon: "User",
        formSchema: {
          type: "object",
          properties: {
            firstName: {
              type: "string",
            },
            lastName: {
              type: "string",
            },
            age: {
              type: "number",
            },
            newsletterSubscription: {
              type: "boolean",
              default: false,
            },
          },
        },
        fieldConfig: {
          firstName: {
            description: "First Name",
            inputProps: {
              required: true,
            },
          },
          lastName: {
            description: "Last Name",
            inputProps: {
              required: true,
            },
          },
          age: {
            description: "Age",
            inputProps: {
              required: true,
            },
          },
          newsletterSubscription: {
            description: "Subscribe to newsletter?",
            fieldType: "switch",
          },
        },
      },
      {
        label: "Employment Details",
        stepIcon: "Briefcase",
        formSchema: {
          type: "object",
          properties: {
            employmentStatus: {
              type: "string",
              enum: ["Employed", "Unemployed", "Student"],
            },
            companyName: {
              type: "string",
            },
            industry: {
              type: "string",
              enum: ["Tech", "Education", "Healthcare", "Other"],
            },
          },
        },
        dependencies: {
          companyName: {
            field: "employmentStatus",
            type: "required",
            condition: {
              value: "Employed",
            },
          },
          industry: {
            field: "employmentStatus",
            type: "hidden",
            condition: {
              value: "Student",
            },
          },
        },
        fieldConfig: {
          employmentStatus: {
            description: "Employment Status",
            inputProps: {
              required: true,
            },
            fieldType: "select",
          },
          companyName: {
            description: "Company Name",
            inputProps: {
              required: false,
            },
          },
          industry: {
            description: "Industry",
            fieldType: "select",
          },
        },
      },
      {
        label: "Preferences and Interests",
        stepIcon: "Heart",
        formSchema: {
          type: "object",
          required: ["hobbies"],
          properties: {
            hobbies: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                  },
                },
              },
            },
            preferredContactMethod: {
              type: "string",
              enum: ["Email", "Phone", "Mail"],
            },
            contactDetails: {
              enum: ["Personal Email", "Work Email"],
            },
          },
        },
        dependencies: {
          contactDetails: {
            field: "preferredContactMethod",
            type: "hidden",
            condition: {
              value: "Phone",
            },
          },
        },
        fieldConfig: {
          hobbies: {
            description: "Hobbies",
          },
          preferredContactMethod: {
            description: "Preferred Contact Method",
            fieldType: "select",
          },
          contactDetails: {
            description: "Contact Details",
          },
        },
      },
    ],
  });

  const [result, setResult] = useState<any>({});

  const onChange = (jsonData: any) => {
    localStorage.setItem("schema", JSON.stringify(jsonData));
    setSchema(jsonData);
  };
  const onSubmit = (jsonData: any) => {
    setResult(jsonData);
    resultRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const schema = localStorage.getItem("schema");
    if (schema) {
      setSchema(JSON.parse(schema));
    }
  }, []);

  return (
    <div>
      <div className="p-4">
        <h1 className="flex justify-center text-lg">Auto Form Generator</h1>
      </div>

      <ResizablePanelGroup
        direction="horizontal"
        className="rounded-lg border p-2"
      >
        <ResizablePanel defaultSize={50}>
          <div className="p-2">
            <Card>
              <CardHeader>
                <CardTitle>Editor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-2">
                  <ZodEditor schema={schema} onChange={onChange} />
                </div>
              </CardContent>
            </Card>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>
          <div className="p-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-2">
                  <StepperWrapper schema={schema} onSubmit={onSubmit} />
                </div>
              </CardContent>
            </Card>
          </div>
        </ResizablePanel>
        <ResizableHandle />
      </ResizablePanelGroup>
      <div className="p-2" ref={resultRef}>
        <Card>
          <CardHeader>
            <CardTitle>Result</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full p-2">
              <JSONEditor jsonData={result} mode="tree" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
