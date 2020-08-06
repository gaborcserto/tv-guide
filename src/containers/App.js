import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Channels from '../data/channels';
import ChannelGroups from '../data/channelGroups';
import ChannelSelect from '../components/ChannelSelect';
import fetchingData from '../hooks/FetchingData';

const getDateNow = () => {
    let currentDate = new Date(),
        month = '' + (currentDate.getMonth() + 1),
        day = '' + currentDate.getDate(),
        year = currentDate.getFullYear();
    if (month.length < 2) month = `0${month}`;
    if (day.length < 2) day = `0${day}`;

    return [year, month, day].join('-');
}

function App() {
    const [ selectChannels, setSelectChannels ] = useState(Channels.slice(0, 3));
    const [ nowPlaying, setNowPlaying ] = useState(null);
    const [ date, setDate ] = useState(getDateNow());

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
