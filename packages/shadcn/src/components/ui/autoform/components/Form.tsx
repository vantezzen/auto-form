import React from "react";

export const Form: React.FC<{
  onSubmit: (e: React.FormEvent) => void;
  children: React.ReactNode;
}> = ({ onSubmit, children }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {children}
    </form>
  );
};
