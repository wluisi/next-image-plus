import * as React from "react";

export type CardProps = {
  id?: string;
  children: React.ReactNode;
};

export function Card({ id, children }: CardProps) {
  return (
    <div
      {...(id && {
        id: id,
      })}
      className="card rounded overflow-hidden border border-gray-300 mb-10"
    >
      {children}
    </div>
  );
}
