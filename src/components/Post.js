import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import {Tooltip} from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import {postEdit, postActive} from "../reducer/SinglePost";

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
  },
  root: {
    maxWidth: 400,
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
      active: {
        color: "red"
      },
      inactive: {
        color: "gray"
      },
  avatar: {
    backgroundColor: "#0d47a1",
  },
  fav: {
    '&:hover': {
      color: 'red',
    }
  },
}
));

export const Post = (slice) => {
  const posts = useSelector((state) => state.posts)
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [active, setActive] = React.useState(slice.active);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const dispatch = useDispatch()

  const handleJoin = () => {
    console.log(slice)
    dispatch(
        postActive({
            id: slice.id,
          active: !active
        })
    )
      setActive(!(slice.active))
      console.log(slice)
  }

  return (
    <Card className={classes.root} key={Math.random()}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {slice.name}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={slice.name}
        starting_time={slice.startingTime}
      />
      {/* <CardMedia
          className={classes.media}
          image="/static/images/cards/paella.jpg"
          title="Paella dish"
        /> */}
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          From: {slice.from}
          <div></div>
          To: {slice.to}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Tooltip title="Join the post">
        <IconButton aria-label="add to favorites" onClick={handleJoin}
                    className={clsx({
                      [classes.active]: active,
                    })}>
          <FavoriteIcon className = {classes.fav}/>
        </IconButton>
        </Tooltip>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton aria-label="share" component={Link} to={`/Edit/${slice.id}`} >
          <EditIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Contact: {slice.contactInfo}</Typography>
          <Typography paragraph>
            Departure time: {slice.startingTime}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  )


}
