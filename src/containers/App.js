import React, { useState, useEffect, forwardRef } from 'react';
import { Container, Navbar, Button, Form, Nav } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Channels from '../data/channels';
//import ChannelGroups from '../data/channelGroups';
import ChannelSelect from '../components/Channel/ChannelSelect';
import ChannelList from '../components/Channel/ChannelList';
import Loading from '../components/Loading/Loading';
import fetchingData from '../hooks/FetchingData';


function App() {
    const [ selectChannels, setSelectChannels ] = useState(Channels.slice(0, 4));
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

    const ref = React.createRef();
    const CustomInput = forwardRef(({ onClick, value }, ref) => (
        <Button onClick={onClick} className="btn-date">
            {value}
        </Button>
    ));

    useEffect(() => {
        if (nowPlayingData.response !== null) {
            setNowPlaying(nowPlayingData.response);
        }
    }, [nowPlayingData.response]);

    return (
        <div className="App">
            <Navbar bg="dark" variant="dark" fixed="top">
                <Navbar.Brand href="#home">
                    Tv Műsor
                </Navbar.Brand>
                <Nav className="mr-auto" />
                <Form inline>
                    <DatePicker
                        dateFormat="yyyy-MM-dd"
                        selected={startDate}
                        onChange={date => setStartDate(date)}
                        customInput={<CustomInput  ref={ref}/>}
                    />
                    <ChannelSelect channels={Channels} select={getSelect} default={selectChannels}/>
                </Form>
            </Navbar>
            <Container>
                {
                    nowPlayingData.loading !== true && nowPlaying !== null ?
                    <React.Fragment>
                        <ChannelList channelsData={nowPlaying}/>
                    </React.Fragment> : <Loading />
                }
            </Container>
        </div>
    );
}

export default App;
