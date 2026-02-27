import styled from 'styled-components';

export const PlayList = styled.div`
  background: #2a2a2a;
  padding: 20px;
  min-height: 300px;
`;

export const Song = styled.div`
  padding: 15px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #3a3a3a;
  }
`;

export const SongTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
  color: ${props => props.active ? '#00ff00' : '#ffffff'};
`;

export const BottomBar = styled.div`
  background: #1a1a1a;
  padding: 20px;
  border-top: 1px solid #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

export const BarSongTitle = styled.div`
  font-size: 16px;
  color: #ffffff;
  text-align: center;
`;

export const Button = styled.button`
  background: #cccccc;
  color: #333333;
  border: none;
  padding: 10px 20px;
  margin: 0 5px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  
  &:hover {
    background: #dddddd;
  }
  
  &:active {
    background: #bbbbbb;
  }
`;
