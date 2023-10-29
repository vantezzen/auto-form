import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

function Result({ formValues }) {
  return (
    <div className="mx-auto my-6 max-w-lg">
      <Card>
        <CardHeader>
          <CardTitle>Results</CardTitle>
        </CardHeader>
        <CardContent>
          <h2>Form Data:</h2>
          <pre>{JSON.stringify(formValues, null, 2)}</pre>
        </CardContent>
      </Card>
    </div>
  );
}

export default Result;
