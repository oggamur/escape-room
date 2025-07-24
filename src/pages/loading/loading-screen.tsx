import PropTypes from 'prop-types';

const LoadingScreen = ({
  size = 40,
  color = '#c75d29',
  bgColor = '#000000ff',
}) => {
  const spinnerStyle = {
    width: size,
    height: size,
    border: `calc(${size}px * 0.1) solid ${bgColor}`,
    borderTop: `calc(${size}px * 0.1) solid ${color}`,
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
      }}
    >
      <div style={spinnerStyle}></div>

      <style>
        {`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}
      </style>
    </div>
  );
};

LoadingScreen.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  bgColor: PropTypes.string,
};

export default LoadingScreen;
