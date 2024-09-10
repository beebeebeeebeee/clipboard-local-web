import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useState } from "react";
import copy from "copy-to-clipboard";
import { enqueueSnackbar } from "notistack";
import { useApp } from "./App.hook.tsx";

export function App() {
  const { clipboards, addClipboard, removeClipboard } = useApp();
  const [clipboardText, setClipboardText] = useState("");

  const copyClipboard = useCallback((content: string) => {
    copy(content);
    enqueueSnackbar("Copied to clipboard", { variant: "success" });
  }, []);

  return (
    <Container>
      <Stack>
        <TextField
          label="Text"
          variant="outlined"
          value={clipboardText}
          onChange={(e) => {
            setClipboardText(e.target.value);
          }}
        />
        <Stack
          justifyContent="flex-end"
          direction="row"
          sx={{
            width: "100%",
          }}
        >
          <Button
            onClick={() => {
              addClipboard(clipboardText);
              setClipboardText("");
            }}
          >
            Add
          </Button>
        </Stack>
        <Box>
          <Stack spacing={2}>
            {clipboards.map((clipboard) => (
              <Card key={clipboard.content}>
                <CardContent>
                  <Typography>{clipboard.content}</Typography>
                </CardContent>
                <CardActions>
                  <Stack
                    justifyContent="flex-end"
                    direction="row"
                    sx={{
                      width: "100%",
                    }}
                  >
                    <Button
                      size="small"
                      color="error"
                      onClick={() => removeClipboard(clipboard.id)}
                    >
                      Remove
                    </Button>
                    <Button
                      size="small"
                      onClick={() => copyClipboard(clipboard.content)}
                    >
                      Copy
                    </Button>
                  </Stack>
                </CardActions>
              </Card>
            ))}
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}
