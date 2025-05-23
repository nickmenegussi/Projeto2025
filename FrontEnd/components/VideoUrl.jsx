import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import YoutubeIframe from 'react-native-youtube-iframe';

export default function VideoUrl({videoUrl}) {

  const getYotubeId = (url) => {
    const match = url.match(/(?:youtube\.com\/.*v=|youtu\.be\/)([^&]+)/);
    return match ? match[1] : null;
  }

  const videoId = getYotubeId(videoUrl)
  return (
    <View style={styles.Container}>
      {videoId ? (
        <YoutubeIframe
          height={200}
          width={'100%'}
          videoId={videoId}
        />
      ) : (
        <Text style={styles.errorText}>Erro:  Não conseguimos carregar o vídeo.A Vídeo fornecida é inválido ou houve um problema ao acessar o conteúdo</Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        alignItems: 'center'
    }, errorText: {
      color: 'white'
    }
})