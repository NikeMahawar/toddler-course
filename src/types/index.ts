export type SupportedFileType = "pdf" | "link" | "png" | "jpg" | "jpeg";

export interface Resources {
  id: string;
  type: SupportedFileType;
  title: string;
  contents?: Content[]; // Simplified, no need for `| []` since an empty array is covered by `[]`
}

export interface Module {
  title: string;
  type: "module";
  contents: Content[];
}

export type Content = {
  type: SupportedFileType;
  title: string;
  id: string;
};

export type MinimalTreeItemData = {
  id: string;         
  value: string;       
  type?: SupportedFileType | "module";
  parentId?: string | null;  
  displayName?: string;
};
