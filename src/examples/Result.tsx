import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";

function Result({ formValues }) {
  return (
    <>
      <div className="mx-auto my-6 max-w-lg">
        <Card>
          <CardHeader>
            <CardTitle>Room-Wise Data</CardTitle>
            <CardDescription>Individual room information</CardDescription>
          </CardHeader>
          </Card>
          </div>
          </>
  );
}

export default Result;
