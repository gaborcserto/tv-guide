import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Channels from '../data/channels';
//import ChannelGroups from '../data/channelGroups';
import ChannelSelect from '../components/Channel/ChannelSelect';
import ChannelList from '../components/Channel/ChannelList';
import Loading from '../components/Loading/Loading';
import fetchingData from '../hooks/FetchingData';


function App() {
    const [ selectChannels, setSelectChannels ] = useState(Channels.slice(0, 3));
    const [ nowPlaying, setNowPlaying ] = useState(null);
    const [ startDate, setStartDate ] = useState(new Date());

    const getSelect = selectValue => {
        if (selectValue) {
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
        date: moment(startDate).format('YYYY-MM-DD')
    });

    useEffect(() => {
        if (nowPlayingData.response !== null) {
            setNowPlaying(nowPlayingData.response);
        }
    }, [nowPlayingData.response]);

    return (
        <div className="App">
            <Container>
                {
                    nowPlaying === null ? <Loading /> :
                    <React.Fragment>
                        <ChannelSelect channels={Channels} select={getSelect} default={selectChannels}/>
                        <DatePicker
                            dateFormat="yyyy-MM-dd"
                            selected={startDate}
                            onChange={date => setStartDate(date)}
                        />
                        <ChannelList channelsData={nowPlaying}/>
                    </React.Fragment>
                }
            </Container>
        </div>
    );
}

export default App;
