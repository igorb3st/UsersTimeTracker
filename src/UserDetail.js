import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles(() =>
	createStyles({
		text: {
			fontSize: 16,
			color: "black",
			fontWeight: "bolder",
			textTransform: "uppercase",
		},
	})
);

const UserDetail = (props) => {
	console.log(props)
	const { text } = useStyles();
	const { id } = useParams();
	const [ post, setPost ] = useState([]);

	useEffect(() => {
		const url = `https://jsonplaceholder.typicode.com/posts`;
		axios(url)
			.then((res) => res.data)
			.then((posts) =>
				posts.filter((it) => it.userId === +id)
			)
			.then((data) => setPost(data));
	}, [ id ]);

	return (
		<>
			<Typography className={ text } component="p" gutterBottom>
				Welcome
			</Typography>
			<hr />
			{ post?.map((item) => {
				return (
					<Card key={ item.id }>
						<CardContent>
							<Typography className={ text } component="p" gutterBottom>
								Post: { item.title }
							</Typography>
							<Typography variant="body2" component="p">
								Body: { item.body }
							</Typography>
							<hr />
						</CardContent>
					</Card>
				);
			}) }
		</>
	);
};

export default UserDetail;
