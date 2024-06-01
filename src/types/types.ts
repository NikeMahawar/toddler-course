import { Dispatch, SetStateAction } from "react";

export type SetItemsType = Dispatch<SetStateAction<LinkItem[]>>;

export interface LinkItem {
  id: string;
  value: string;
  type: string;
  displayName?: string;
}

export interface AddLinkOverlayProps {
  setItems: SetItemsType;
  addLinkOverlay: boolean;
  setAddLinkOverlay: Dispatch<SetStateAction<boolean>>;
}
