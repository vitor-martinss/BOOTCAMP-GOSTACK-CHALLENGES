import React, {useState, useEffect} from "react";

import {
	SafeAreaView,
	View,
	FlatList,
	Text,
	StatusBar,
	StyleSheet,
	TouchableOpacity,
} from "react-native";

import api from './services/api'

export default function App() {
	const [repositories, setRepository] = useState([])

	useEffect(() => {
		api.get('repositories').then(response => {
			// check if api is connected
			setRepository(response.data)
		})
	}, [])

	async function handleLikeRepository(id) {
		// Implement "Like Repository" functionality

		// call api with route
		const response = await api.post(`repositories/${id}/like`)

		// get our data
		const likedRepository = response.data
		
		//make a condition for check if the liked repository has the same id
		const repositoriesUpdated = repositories.map(repository => {
			if (repository.id === id) {
				return likedRepository
			} else {
				return repository
			}
		})

		// update repository
		setRepository(repositoriesUpdated)
	}

	return (
		<>
		<StatusBar barStyle="light-content" backgroundColor="#7159c1" />
		<SafeAreaView style={styles.container}>
			<FlatList
				data={repositories}
				keyExtractor={repository => repository.id}
				renderItem={({item: repository})=>(
					<View style={styles.repositoryContainer}>
						<Text style={styles.repository}>{repository.title}</Text>

						<View style={styles.techsContainer}>
							{repository.techs.map(techItem => (
								<Text key={techItem} style={styles.tech}>
									{techItem}
								</Text>
							))}
						</View>

						<View style={styles.likesContainer}>
							<Text
							style={styles.likeText}
							// Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
							testID={`repository-likes-${repository.id}`}
							>
								{repository.likes} curtidas 
							</Text>
						</View>

						<TouchableOpacity
							style={styles.button}
							onPress={() => handleLikeRepository(repository.id)}
							// Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
							testID={`like-button-${repository.id}`}
						>
							<Text style={styles.buttonText}>Curtir</Text>
						</TouchableOpacity>
					</View>
				)}
			/>
			
		</SafeAreaView>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#7159c1",
	},
	repositoryContainer: {
		marginTop: 30,
		marginBottom: 15,
		marginHorizontal: 15,
		backgroundColor: "#fff",
		padding: 20,
	},
	repository: {
		fontSize: 32,
		fontWeight: "bold",
	},
	techsContainer: {
		flexDirection: "row",
		marginTop: 10,
	},
	tech: {
		fontSize: 12,
		fontWeight: "bold",
		marginRight: 10,
		backgroundColor: "#04d361",
		paddingHorizontal: 10,
		paddingVertical: 5,
		color: "#fff",
	},
	likesContainer: {
		marginTop: 15,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	likeText: {
		fontSize: 14,
		fontWeight: "bold",
		marginRight: 10,
	},
	button: {
		marginTop: 10,
	},
	buttonText: {
		fontSize: 14,
		fontWeight: "bold",
		marginRight: 10,
		color: "#fff",
		backgroundColor: "#7159c1",
		padding: 15,
	},
});
