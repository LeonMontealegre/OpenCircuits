import React from "react";
import {connect} from "react-redux";

import {SharedAppState} from "shared/state";
import {ToggleItemNav} from "shared/state/ItemNav/actions";

import "./index.scss";


export type ItemNavItem = {
    id: string;
    label: string;
    icon: string;
}
export type ItemNavSection = {
    id: string;
    label: string;
    items: ItemNavItem[];
}
export type ItemNavConfig = {
    imgRoot: string;
    sections: ItemNavSection[];
}


type OwnProps = {
    config: ItemNavConfig;
}
type StateProps = {
    isOpen: boolean;
    isEnabled: boolean;
    isLocked: boolean;
}
type DispatchProps = {
    toggle: () => void;
}

type Props = StateProps & DispatchProps & OwnProps;
function _ItemNav({ isOpen, isEnabled, isLocked, config, toggle }: Props) {
    return (<>
        { // Hide tab if the circuit is locked
        (isEnabled && !isLocked) &&
            <div className={`tab ${isOpen ? "tab__closed" : ""}`}
                 title="Circuit Components"
                 onClick={() => toggle()}></div>
        }
        <nav className={`itemnav ${(isOpen) ? "" : "itemnav__move"}`}>
            {config.sections.map((section, i) =>
                <React.Fragment key={`itemnav-section-${i}`}>
                    <h4>{section.label}</h4>
                    {section.items.map((item, j) =>
                        <button key={`itemnav-section-${i}-item-${j}`}
                                onDragStart={(ev) => {
                                    ev.dataTransfer.setData("custom/component", item.id);
                                    ev.dataTransfer.dropEffect = "copy";
                                }}>
                            <img src={`/${config.imgRoot}/${section.id}/${item.icon}`} alt={item.label} />
                            <br />
                            {item.label}
                        </button>
                    )}
                </React.Fragment>
            )}
        </nav>
    </>);
}


const MapState = (state: SharedAppState) => ({
    isLocked: state.circuit.isLocked,
    isEnabled: state.itemNav.isEnabled,
    isOpen: state.itemNav.isOpen
});
const MapDispatch = {
    toggle: ToggleItemNav
};

export const ItemNav = connect<StateProps, DispatchProps, OwnProps, SharedAppState>(
    MapState,
    MapDispatch
)(_ItemNav);
