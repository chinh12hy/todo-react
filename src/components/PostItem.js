import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchHero from "./SearchHero";

export default class Hello extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearchHero = this.handleSearchHero.bind(this);
    }

    state = {
        posts: [],
        champions: [],
        listSearch: []
    };

    // Bằng created trong Vue js
    componentDidMount() {
        axios.get('http://ddragon.leagueoflegends.com/cdn/10.6.1/data/vn_VN/champion.json').then(response => {
            const obj = response.data.data;
            const result = Object.keys(obj).map(function(key) {
                return obj[key];
            });
            console.log(result);
            this.setState({
                champions: result,
                listSearch: result
            });
        })
    }

    handleSearchHero(nameHero) {
        let heroes = this.state.champions;
        heroes = heroes.filter(o => {
            return o.name.toLowerCase().includes(nameHero);
        });
        this.setState({
            listSearch: heroes
        });
    }

    render() {
        const mappingPosition = {
          'Mage': 'Pháp sư',
          'Fighter': 'Đấu sĩ',
          'Tank': 'Đỡ đòn',
          'Marksman': 'Xạ thủ',
          'Support': 'Hỗ trợ',
          'Assassin': 'Sát thủ',
        };
        return <div className="container">
            <div className="row">
                <SearchHero on-search={this.handleSearchHero}/>
                <ul id="menu-champion">
                    {
                        this.state.listSearch.map((o, index) => {
                        return <li key={index}>
                            <div className="card-hero-inner">
                                <img className="hero-image" src={`http://ddragon.leagueoflegends.com/cdn/10.6.1/img/champion/${o.id}.png`} alt={o.title}/>
                                <span className="py-1">{mappingPosition[o.tags[0]]}</span>
                                <span>{o.name}</span>
                            </div>
                        </li>
                    })}
                </ul>
            </div>
        </div>
    }
}
