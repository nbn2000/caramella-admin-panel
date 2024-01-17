import PropTypes from 'prop-types';

import { Grid, Typography } from '@mui/material';

const GRID_ITEM_SIZE = 3;

export function PreviewImage({ watch, selectedFiles, name }) {
  if (watch(name).length !== 0) {
    return (
      <div>
        <Typography variant="subtitle1" marginTop={2}>
          Танланган Расмлар:
        </Typography>
        <Grid container spacing={1}>
          {Array.isArray(watch(name)) ? (
            watch(name)?.map((file, index) => (
              <Grid item xs={GRID_ITEM_SIZE} key={index}>
                <img src={file} alt={file} width={100} />
              </Grid>
            ))
          ) : (
            <Grid item xs={GRID_ITEM_SIZE}>
              <img src={watch(name)} alt={name} width={100} />
            </Grid>
          )}
        </Grid>
      </div>
    );
  }
  return <div />;
}

PreviewImage.propTypes = {
  watch: PropTypes.any.isRequired,
  name: PropTypes.string.isRequired,
  selectedFiles: PropTypes.any.isRequired,
};
