'use client';
import { Box, Typography, Switch, FormControlLabel } from "@mui/material";

type ArticleCommentProps = {
    checked?: boolean  ;
  };

const CommentPermission = (props: ArticleCommentProps)=> {
    const { checked } = props;
    return (
        <Box sx={{ display: "flex", padding: "24px", gap: '16px', alignItems: "center", justifyContent: "space-between" }}>
            <Typography data-testid="comment-header-text" sx={{ fontSize: '18px', fontWeight: '600' }}>
                Сэтгэгдэл идэвхтэй
            </Typography>
            <FormControlLabel  data-testid="commentPermission" label="" control={<Switch data-testid="switch-input" color="success" checked={checked}/>}/>
        </Box>
    );
}
export default CommentPermission