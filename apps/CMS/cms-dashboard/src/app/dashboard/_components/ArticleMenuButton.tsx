'use client';

import React, { useCallback, useState } from 'react';
import { MdMoreVert } from 'react-icons/md';
import { ArticleMenu } from '../../assets/ArticleBtn';
import { LinkButton } from '../../assets/LinkBtn';

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
                  <ArticleMenu />
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
                  <LinkButton />
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
