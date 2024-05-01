'use client';

import React, { useCallback, useState } from 'react';
import { MdMoreVert } from 'react-icons/md';

const ArticleMenuButton = ({ id }: { id: string }) => {
  const [anchorEl, setAnchorEl] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    setAnchorEl(true);
  };

  const handleClose = () => {
    setAnchorEl(false);
  };

  const handleClickCopy = useCallback(async () => {
    setCopied(true);

    const domain = window.location.origin;

    await navigator.clipboard.writeText(`${domain}/articles/edit-article/${id}`);
  }, [id]);

  return (
    <div className="p-8">
      <MdMoreVert data-testid="menu-button-test-id" fontSize={28} color="#5E6166" onClick={handleClick} />

      <div className="relative">
        {anchorEl && (
          <div>
            <ul className="menu bg-base-200 w-56 rounded-box">
              <li
                data-testid="close-menu-button-test-id"
                className="gap-4"
                onClick={() => {
                  handleClose();
                  setCopied(false);
                }}
              >
                <a>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M17.54 2.23L16.15 0.55C15.88 0.21 15.47 0 15 0H3C2.53 0 2.12 0.21 1.84 0.55L0.46 2.23C0.17 2.57 0 3.02 0 3.5V16C0 17.1 0.9 18 2 18H16C17.1 18 18 17.1 18 16V3.5C18 3.02 17.83 2.57 17.54 2.23ZM3.24 2H14.76L15.57 2.97H2.44L3.24 2ZM2 16V5H16V16H2ZM10.45 7H7.55V10H5L9 14L13 10H10.45V7Z"
                      fill="#121316"
                    />
                  </svg>
                  Архив
                </a>
              </li>
              <li
                data-testid="copy-clipboard-button-test-id"
                onClick={() => {
                  handleClickCopy();
                }}
              >
                <a>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M17 7H13V9H17C18.65 9 20 10.35 20 12C20 13.65 18.65 15 17 15H13V17H17C19.76 17 22 14.76 22 12C22 9.24 19.76 7 17 7ZM11 15H7C5.35 15 4 13.65 4 12C4 10.35 5.35 9 7 9H11V7H7C4.24 7 2 9.24 2 12C2 14.76 4.24 17 7 17H11V15ZM8 11H16V13H8V11Z"
                      fill="#121316"
                    />
                  </svg>
                  Линк хуулах
                </a>
              </li>
            </ul>
          </div>
        )}

        {copied && <p className="absolute text-[#545353] bg-[#b3b3b3] px-[10px] rounded-md mt-2 ml-2">Copied</p>}
      </div>
    </div>
  );
};

export default ArticleMenuButton;
