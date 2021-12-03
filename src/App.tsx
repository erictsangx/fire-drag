// noinspection HttpUrlsUsage

import React, { FormEvent, useEffect, useState } from 'react'
import {
  Alert,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  Snackbar,
  styled,
  TextareaAutosize,
  TextField,
  Typography,
} from '@mui/material'
import {
  BACKGROUND,
  DEFAULT_OPTIONS,
  FOREGROUND,
  TAB_POSITIONS,
} from './shared/constants'
import { isEmpty, loadOptions, saveOptions } from './shared/utils'

const Main = styled(Paper)`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;

  form {
    width: 80%;
    max-width: 680px;
    padding: 20px 16px;
    border: 1px solid white;
  }

  .MuiTextField-root,
  fieldset {
    margin: 8px 0;
    border-bottom: 1px solid white;
  }

  .MuiTextField-root {
    padding-bottom: 8px;
  }
`

const Bottom = styled('div')`
  display: flex;
  justify-content: flex-end;
  padding: 16px;
`

const SearchEngineExample =
  'e.g. https://www.google.com/search?q=@@ -> https://www.google.com/search?q=SelectedText'
const SearchEngineError = `It should start with http(s):// and include '@@'`

function App() {
  const [pref, setPref] = useState({ ...DEFAULT_OPTIONS })
  const [open, setOpen] = useState(false)
  const [inputError, setInputError] = useState(false)
  const [helperText, setHelperText] = useState(SearchEngineExample)

  useEffect(() => {
    loadOptions().then((options) => {
      setPref(options)
    })
  }, [])

  const submit = (event: FormEvent) => {
    event.preventDefault()
    if (inputError) {
      return
    }
    setOpen(false)
    const trimmed = {
      ...pref,
      searchEngine: pref.searchEngine.trim(),
      whitelist: pref.whitelist.trim(),
    }
    saveOptions(trimmed).then(() => {
      setOpen(true)
    })
  }

  useEffect(() => {
    if (
      isEmpty(pref.searchEngine) ||
      !pref.searchEngine.includes('@@') ||
      (!pref.searchEngine.startsWith('https://') &&
        !pref.searchEngine.startsWith('http://'))
    ) {
      setInputError(true)
      setHelperText(SearchEngineError)
    } else {
      setInputError(false)
      setHelperText(SearchEngineExample)
    }
  }, [pref.searchEngine])

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Main elevation={2}>
      <Paper component="form" noValidate autoComplete="off" onSubmit={submit}>
        <TextField
          required
          error={inputError}
          fullWidth
          value={pref.searchEngine}
          label="Search Engine URL"
          helperText={helperText}
          onChange={(event) => {
            setPref((prevState) => ({
              ...prevState,
              searchEngine: event.target.value,
            }))
          }}
        />

        <FormControl component="fieldset" fullWidth>
          <FormLabel component="legend">Search texts in</FormLabel>
          <RadioGroup
            row
            value={pref.textActive}
            onChange={(event, value) => {
              setPref((prevState) => ({
                ...prevState,
                textActive: value,
              }))
            }}
          >
            <FormControlLabel
              value={FOREGROUND}
              control={<Radio />}
              label="Foreground"
            />
            <FormControlLabel
              value={BACKGROUND}
              control={<Radio />}
              label="Background"
            />
          </RadioGroup>
        </FormControl>

        <FormControl component="fieldset" fullWidth>
          <FormLabel component="legend">Open links in</FormLabel>
          <RadioGroup
            row
            value={pref.linkActive}
            onChange={(event, value) => {
              setPref((prevState) => ({
                ...prevState,
                linkActive: value,
              }))
            }}
          >
            <FormControlLabel
              value={FOREGROUND}
              control={<Radio />}
              label="Foreground"
            />
            <FormControlLabel
              value={BACKGROUND}
              control={<Radio />}
              label="Background"
            />
          </RadioGroup>
        </FormControl>

        <FormControl component="fieldset" fullWidth>
          <FormLabel component="legend">Open images in</FormLabel>
          <RadioGroup
            row
            value={pref.imageActive}
            onChange={(event, value) => {
              setPref((prevState) => ({
                ...prevState,
                imageActive: value,
              }))
            }}
          >
            <FormControlLabel
              value={FOREGROUND}
              control={<Radio />}
              label="Foreground"
            />
            <FormControlLabel
              value={BACKGROUND}
              control={<Radio />}
              label="Background"
            />
          </RadioGroup>
        </FormControl>

        <FormControl component="fieldset" fullWidth>
          <FormLabel component="legend">New tab position</FormLabel>
          <RadioGroup
            row
            value={pref.position}
            onChange={(event, value) => {
              setPref((prevState) => ({
                ...prevState,
                position: value,
              }))
            }}
          >
            {TAB_POSITIONS.map((it, index) => (
              <FormControlLabel
                key={`position-${it.value}-${index}`}
                value={it.value}
                control={<Radio />}
                label={it.label}
              />
            ))}
          </RadioGroup>
        </FormControl>

        <Box mt={2}>
          <Typography variant="subtitle1" display={'block'} gutterBottom>
            Disable fire-drag (URL separated by new lines, support subdomain
            using *.):
          </Typography>
          <TextareaAutosize
            value={pref.whitelist}
            onChange={(event) => {
              setPref((prevState) => ({
                ...prevState,
                whitelist: event.target.value,
              }))
            }}
            placeholder="e.g. *.mozilla.org"
            minRows={5}
            style={{ width: '100%' }}
          />
        </Box>

        <Bottom>
          <Button
            variant="contained"
            type="submit"
            color={'info'}
            disabled={inputError}
          >
            Save
          </Button>
        </Bottom>
      </Paper>

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Saved!
        </Alert>
      </Snackbar>
    </Main>
  )
}

export default App
