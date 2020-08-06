import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import moment from 'moment';
import Channels from '../data/channels';
import ChannelGroups from '../data/channelGroups';
import ChannelSelect from '../components/ChannelSelect';
import fetchingData from '../hooks/FetchingData';


function App() {
    const [ selectChannels, setSelectChannels ] = useState(Channels.slice(0, 3));
    const [ nowPlaying, setNowPlaying ] = useState(null);
    const [ date, setDate ] = useState(moment().format('YYYY-MM-DD'));

    const getSelect = selectValue => {
        if (selectValue) {
            console.log(selectValue);
            setSelectChannels(selectValue);
        }
    }

    const getChannels = data => {
        let channels = '';
        data.map(channel => (
            channels += `&channel_id%5B%5D=${channel.id}`
        ));
        return channels;
    }

    const nowPlayingData = fetchingData({
        channelID: getChannels(selectChannels),
        date: date
    });

    console.log(nowPlayingData);
    useEffect(() => {
        if (nowPlayingData.response !== null) {
            setNowPlaying(nowPlayingData.response);
        }
    }, [nowPlayingData.response]);

    return (
        <div className="App">
            <Container>
                <ChannelSelect channels={Channels} select={getSelect} default={selectChannels}/>
            </Container>
        </div>
    );
}

export default App;
