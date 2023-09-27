import { CommandBar, ICommandBarItemProps, ICommandBarStyles } from '@fluentui/react';
import { IContextualMenuItem } from '@fluentui/react';
import * as React from 'react';

export interface ICommandItem {
    id: string;
    displayName: string;
    enabled?: boolean;
    iconName?: string;
}

export interface CanvasCommandBarProps {
    width?: number;
    height?: number;
    items: ICommandItem[];
    onSelected: (key: string) => void;
    disabled: boolean | null;
    tabIndex?: number;
}

export const CanvasCommandBar = React.memo((props: CanvasCommandBarProps) => {
    const { items, height, width, disabled, onSelected, tabIndex } = props;

    const onClick = React.useCallback(
        (ev?: unknown, item?: IContextualMenuItem | undefined) => {
            if (item) {
                onSelected(item.key);
            }
            return true;
        },
        [onSelected],
    );

    const commandBarItems = React.useMemo(() => {
        return items.map((i) => {
            return getItemProps(i, disabled, onClick, tabIndex);
        });
    }, [items, disabled, onClick, tabIndex]);

    const rootStyle = React.useMemo(() => {
        return {
            display: 'block',
            position: 'absolute',
            width: width,
        } as React.CSSProperties;
    }, [width]);

    const commandBarStyle = React.useMemo(() => {
        return {
            root: {
                height: height,
                padding: 0,
                background: 'rgba(255, 255, 255,0)',
                minWidth: 0,
            },
        } as ICommandBarStyles;
    }, [height]);

    return <div style={rootStyle}>
        <CommandBar styles={commandBarStyle} items={commandBarItems} />
        </div>;
});
CanvasCommandBar.displayName = 'CanvasCommandBar';

function getItemProps(
    i: ICommandItem,
    disabled: boolean | null,
    onClick: (ev?: unknown, item?: IContextualMenuItem | undefined) => boolean,
    tabIndex: number | undefined,
): ICommandBarItemProps {
    return {
        key: i.id,
        text: i.displayName,
        disabled: i.enabled === false || disabled,
        onClick: onClick,
        iconProps: {
            iconName: i.iconName,
        },
        tabIndex: tabIndex,
        data: i,
        buttonStyles: { root: { background: 'rgba(255, 255, 255,0)' } },
    } as ICommandBarItemProps;
}
