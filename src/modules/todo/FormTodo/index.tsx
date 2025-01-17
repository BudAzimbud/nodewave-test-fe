import { signIn } from "next-auth/react";
import { useState, FormEvent, JSX } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Checkbox,
  Card,
  CardContent,
  Snackbar,
  Alert,
  ListItem,
  IconButton,
} from "@mui/material";
import { useFieldArray, useForm } from "react-hook-form";
import { ITodoForm } from "../interface";
import { createTodos, deleteTodo, updateStatusTodo } from "../action";

import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

export default function FormTodo(): JSX.Element {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset
  } = useForm<ITodoForm>({
    defaultValues: {
      listTodo: [],
    },
  });

  const { fields, remove, append, update } = useFieldArray({
    control,
    name: "listTodo",
  });

  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

  const onSubmit = async (values: ITodoForm): Promise<void> => {
    createTodos(values)
      ?.then((res) => {
        console.log(res);
        setSnackbarMessage("Success");
        setSnackbarOpen(true);
        append({ ...res.data.content, todoId: res.data.content.id });
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box
      sx={{
        background: "#FAFAFB",
      }}
    >
      <Box
        sx={{
          minHeight: "100vh",
          backgroundImage: "url('/images/background-login.png')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="sm">
          <Typography
            textAlign={"center"}
            color="#174286"
            fontWeight={"bold"}
            variant="h4"
            gutterBottom
          >
            Todo
          </Typography>
          <Card sx={{ padding: 4, borderRadius: 2 }}>
            <CardContent>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Box
                  component="form"
                  onSubmit={handleSubmit(onSubmit)}
                  width="100%"
                  mt={2}
                  display={"flex"}
                  gap={3}
                  alignItems={"center"}
                >
                  <TextField
                    label="Add new task"
                    variant="standard"
                    margin="normal"
                    size="small"
                    fullWidth
                    error={!!errors.item?.message}
                    helperText={errors.item?.message}
                    {...register("item", {
                      required: "Nama task wajib di isi",
                    })}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3, textWrap: "nowrap" }}
                  >
                    Add Todo
                  </Button>
                </Box>
              </Box>
              {fields?.map((item, idx) => {
                return (
                  <Box
                    mt={3}
                    width={"100%"}
                    key={item.id}
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    p="0"
                  >
                    <Box display={"flex"} alignItems={"center"}>
                      <Checkbox
                        checked={item.checked}
                        onChange={(e) => {
                          update(idx, {
                            ...item,
                            checked: e.currentTarget.checked,
                          });
                        }}
                      />
                      <Typography>{item.item}</Typography>
                    </Box>
                    <IconButton
                      onClick={() => {
                        console.log(item);
                        updateStatusTodo({
                          id: item.todoId,
                          form: {
                            action: item.isDone ? "UNDONE" : "DONE",
                          },
                        }).then(() => {
                          update(idx, {
                            ...item,
                            isDone: !item.isDone,
                          });
                        });
                      }}
                    >
                      {item?.isDone ? (
                        <HighlightOffIcon />
                      ) : (
                        <CheckCircleOutlineIcon />
                      )}
                    </IconButton>
                  </Box>
                );
              })}
              <Button
                sx={{ mt: 3 }}
                onClick={() => {
                  fields?.forEach((item, idx) => {
                    if (item.checked) {
                      deleteTodo(item.todoId)?.then(() => {
                        remove(idx);
                      });
                    }
                  });
                }}
                variant="contained"
                color="error"
              >
                Deleted Selected
              </Button>
            </CardContent>
          </Card>
        </Container>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
