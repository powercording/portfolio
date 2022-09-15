import { Grid, Typography } from '@mui/material';
import React from 'react'
import { useRecoilValue } from 'recoil';
import { didabaraSelector, didabaraState } from '../config/Atom';

function FollowingLists() {
  const didabara = useRecoilValue(didabaraState);
  // console.log("ㅇ?", didabara?.join);

  if (didabara?.join.length === 1) {
    return (
      <>
      <Grid>
        <Typography>없어요..</Typography>
      </Grid>
      </>
    )}

  return (
    <div>

    </div>
  )
}

export default FollowingLists