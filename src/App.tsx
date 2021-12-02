import React, { FormEvent, useState } from 'react'
import {
  Alert,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Snackbar,
  TextField,
} from '@mui/material'
import { BACKGROUND, DEFAULT_OPTIONS, FOREGROUND } from './shared/constants'
import { saveOptions } from './shared/utils'
import styled from '@emotion/styled'


const Main = styled.div`
  margin: 16px auto;
  display: flex;
  justify-content: center;

  .MuiBox-root {
    width: 80%;
    max-width: 680px;
    padding: 20px 16px;
    border: 1px solid white;
  }

  .MuiTextField-root, fieldset {
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

function App() {

  const [pref, setPref] = useState({ ...DEFAULT_OPTIONS })
  const [open, setOpen] = useState(false)

  const submit = (event: FormEvent) => {
    event.preventDefault()
    setOpen(false)
    saveOptions(pref).then(() => {
      setOpen(true)
    })
    console.log('pref', pref)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Main>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={submit}
      >
        <TextField
          required
          fullWidth
          value={pref.searchEngine}
          label="Search Engine URL"
          helperText="e.g. https://www.google.com/search?q=@@ -> https://www.google.com/search?q=SelectedText"
          onChange={(event) => {
            setPref(prevState => ({
              ...prevState,
              searchEngine: event.target.value,
            }))
          }}
        />

        <FormControl component="fieldset" fullWidth>
          <FormLabel component="legend">Search texts in</FormLabel>
          <RadioGroup row value={pref.textActive}
                      onChange={(event, value) => {
                        setPref((prevState => ({
                          ...prevState,
                          textActive: value,
                        })))
                      }}>
            <FormControlLabel value={FOREGROUND} control={<Radio />} label="Foreground" />
            <FormControlLabel value={BACKGROUND} control={<Radio />} label="Background" />
          </RadioGroup>
        </FormControl>

        <FormControl component="fieldset" fullWidth>
          <FormLabel component="legend">Open links in</FormLabel>
          <RadioGroup row value={pref.linkActive} onChange={(event, value) => {
            setPref((prevState => ({
              ...prevState,
              linkActive: value,
            })))
          }}>
            <FormControlLabel value={FOREGROUND} control={<Radio />} label="Foreground" />
            <FormControlLabel value={BACKGROUND} control={<Radio />} label="Background" />
          </RadioGroup>
        </FormControl>

        <FormControl component="fieldset" fullWidth>
          <FormLabel component="legend">Open images in</FormLabel>
          <RadioGroup row value={pref.imageActive} onChange={(event, value) => {
            setPref((prevState => ({
              ...prevState,
              imageActive: value,
            })))
          }}>
            <FormControlLabel value={FOREGROUND} control={<Radio />} label="Foreground" />
            <FormControlLabel value={BACKGROUND} control={<Radio />} label="Background" />
          </RadioGroup>
        </FormControl>

        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Saved!
          </Alert>
        </Snackbar>

        <Bottom>
          <Button variant="contained" type="submit" color={'info'}>Save</Button>
        </Bottom>

      </Box>
    </Main>
  )
}

export default App
