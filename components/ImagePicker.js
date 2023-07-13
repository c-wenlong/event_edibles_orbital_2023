export function ImagePickerAvatar({ uri, onPress }) {
    return (
        <ImageBackground
            style={styles.imageBackground}
            source={images.whatsappBackground}>
            <View style={styles.avatar}>
                <Image
                    style={styles.avatarImage}
                    source={uri ? { uri } : images.avatar}
                />
                <TouchableOpacity style={styles.addButton} onPress={onPress}>
                    <Image style={styles.addButtonIcon} source={images.addButton} />
                </TouchableOpacity>
                <Text style={styles.usernameText}>Gapur Kassym</Text>
            </View>
        </ImageBackground>
    );
}