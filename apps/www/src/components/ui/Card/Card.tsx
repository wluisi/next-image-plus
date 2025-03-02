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
      className="graphinery-ui-card rounded overflow-hidden shadow-xl mb-10"
    >
      {children}
    </div>
  );
}
