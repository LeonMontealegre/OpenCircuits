import React, {useState} from "react";
import {connect} from "react-redux";

import {Overlay} from "shared/components/Overlay";
import {Popup} from "shared/components/Popup";

import {SharedAppState}    from "shared/state";
import {CloseHeaderPopups} from "shared/state/Header/actions";
import {HeaderPopups}      from "shared/state/Header/state";
import {GetOS} from "shared/utils/GetOS";

import "./index.scss";


type OwnProps = {}
type StateProps = {
    curPopup: HeaderPopups;
}
type DispatchProps = {
    CloseHeaderPopups: typeof CloseHeaderPopups;
}

type Props = StateProps & DispatchProps & OwnProps;
const _KeyboardShortcutsPopup = ({curPopup, CloseHeaderPopups}: Props) => {
    const [{os}, setState] = useState({ os: GetOS() });

    const Shortcut = ({label, pre, keys, mod}: { label: string, pre?: string, keys: string[], mod?: boolean }) => (
        <tr>
            <td>{label}</td>
            <td>
                {pre}
                {mod && <span id="key">{os === "mac" ? "CMD" : "CTRL"}</span>}
                {keys.map((key, i) => (
                    <React.Fragment key={`keyboardshortcuts__popup__${label}-${key}-${i}`}>
                        {(i > 0 || mod) && <span>+ </span>}
                        <span id="key">{key}</span>
                    </React.Fragment>
                ))}
            </td>
        </tr>
    );

    console.log(curPopup);

    return (
        <Popup title="Keyboard Shortcuts"
               className="keyboardshortcuts__popup"
               isOpen={(curPopup === "keyboard_shortcuts")}
               close={CloseHeaderPopups}>
            <div className="keyboardshortcuts__popup__toggle__container">
                <button name="win"
                        className={os !== "mac" ? "selected" : ""}
                        onClick={() => setState({os: "win"})}>Windows / ChromeOS Shortcuts</button>

                <button name="mac"
                        className={os === "mac" ? "selected" : ""}
                        onClick={() => setState({os: "mac"})}>Mac Shortcuts</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Function</th>
                        <th>Shortcut</th>
                    </tr>
                </thead>
                <tbody>
                    <Shortcut label="Undo"          keys={["Z"]} mod />
                    <Shortcut label="Redo"          keys={["Shift", "Z"]} mod />
                    <Shortcut label="Cut"           keys={["X"]} mod />
                    <Shortcut label="Copy"          keys={["C"]} mod />
                    <Shortcut label="Paste"         keys={["V"]} mod />
                    <Shortcut label="Select All"    keys={["A"]} mod />
                    <Shortcut label="Deselect All"  keys={["Esc"]} />
                    <Shortcut label="Delete"        keys={["Backspace"]} />
                    <Shortcut label="Snip"          keys={["X"]} />
                    <Shortcut label="Snapping"      pre={"Hold "} keys={["Shift"]} />
                    <Shortcut label="Duplicate"     keys={["D"]} mod />
                    <Shortcut label="Fit to Screen" keys={["F"]} />
                </tbody>
            </table>
        </Popup>
    )

    return (<>
        <Overlay isOpen={curPopup === "keyboard_shortcuts"} close={CloseHeaderPopups} />

        <div className="keyboardshortcuts__popup"
             style={{ display: (curPopup === "keyboard_shortcuts" ? "initial" : "none") }}>
            <h1>Keyboard Shortcuts</h1>

        </div>
    </>);
};

export const KeyboardShortcutsPopup = connect<StateProps, DispatchProps, OwnProps, SharedAppState>(
    (state) => ({ curPopup: state.header.curPopup }),
    { CloseHeaderPopups }
)(_KeyboardShortcutsPopup);
