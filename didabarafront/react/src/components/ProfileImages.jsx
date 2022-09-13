import { Card, List, ListItem } from '@mui/material';
import React from 'react'
import { Profile1, Profile2, Profile3 } from "../items/profileImages";

function ProfileImages() {
  return (
    <Card>
        <List>
            <Profile1 />
            <Profile2 />
            <Profile3 />
        </List>
    </Card>
  )
}

export default ProfileImages