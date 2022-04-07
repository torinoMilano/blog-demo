import React from "react";

export function List({
                         as: As = React.Fragment,
                         items = [],
                         renderItem = (item: any) => <div>{item.name}</div>,
                         ...props
                     }) {
    return <As {...props}>{items.map(renderItem)}</As>;
}