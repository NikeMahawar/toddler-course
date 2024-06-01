import React, { useEffect, useRef, useState } from "react";
import { Cross1Icon } from "@radix-ui/react-icons";
import { v4 as uuid } from "uuid";
import { showErrorToast, validateURL } from '../types/utils';
import { AddLinkOverlayProps, LinkItem } from '../types/types';

const AddLinkOverlay: React.FC<AddLinkOverlayProps> = ({
  setItems,
  addLinkOverlay,
  setAddLinkOverlay,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [urlName, setUrlName] = useState("");
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    if (addLinkOverlay) {
      inputRef.current?.focus();
    }
  }, [addLinkOverlay]);

  const handleAddLink = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (urlName.trim() === "" || displayName.trim() === "") {
      showErrorToast("Please complete all fields");
      return;
    }

    if (!validateURL(urlName.trim())) {
      showErrorToast("Please enter a valid URL");
      return;
    }

    setItems((prev) => [
      ...prev,
      {
        id: uuid(),
        value: urlName,
        type: "link",
        displayName: displayName,
      },
    ]);
    setAddLinkOverlay(false);
    setUrlName("");
    setDisplayName("");
  };

  return (
    <div
      className={`${
        addLinkOverlay
          ? "opacity-100 visible transform translate-x-0 translate-y-0 scale-100"
          : "opacity-0 invisible"
      } create-module-overlay fixed inset-0 flex items-center bg-black bg-opacity-50 z-50 transition-all duration-300`}
    >
      <form
        onSubmit={handleAddLink}
        className="create-module relative space-y-5 bg-white p-8 rounded-xl w-[460px] h-fit mx-auto"
      >
        <div className="flex items-center justify-between">
          <div className="font-bold text-lg">Add new Link</div>
          <button
            type="button"
            onClick={() => {
              setAddLinkOverlay(false);
              setUrlName("");
              setDisplayName("");
            }}
            className="text-gray-600 hover:text-[#d33852] transition-all duration-300"
          >
            <Cross1Icon className="size-4" />
          </button>
        </div>
        <div className="link space-y-2">
          <label htmlFor="link-name" className="text-sm font-semibold">
            URL
          </label>
          <input
            ref={inputRef}
            value={urlName}
            onChange={(e) => setUrlName(e.target.value)}
            name="link-name"
            id="link-name"
            type="text"
            placeholder="Link URL"
            className="w-full border-2 border-slate-100 p-2 rounded-md"
          />
        </div>
        <div className="link space-y-2">
          <label htmlFor="displayName" className="text-sm font-semibold">
            Display name
          </label>
          <input
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            name="displayName"
            id="displayName"
            type="text"
            placeholder="Display name"
            className="w-full border-2 border-slate-100 p-2 rounded-md"
          />
        </div>
        <div className="buttons text-sm font-medium flex justify-end items-center gap-x-5">
          <button
            type="button"
            onClick={() => {
              setAddLinkOverlay(false);
              setUrlName("");
              setDisplayName("");
            }}
            className="text-gray-600 border border-slate-200 p-3 rounded-lg w-fit"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="text-white bg-[#008392] border border-slate-200 p-3 rounded-lg w-fit"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddLinkOverlay;
