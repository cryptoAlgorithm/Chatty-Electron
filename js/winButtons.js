// Unhide window buttons when running as an app
if (navigator.userAgent.toLowerCase().indexOf(' electron/') > -1) {
    document.getElementById('window-buttons').style.display = 'grid';
    document.onreadystatechange = (event) => {
        if (document.readyState === "complete") {
            handleWindowControls();
        }
    };

    function handleWindowControls() {
        // Make minimise/maximise/restore/close buttons work when they are clicked
        document.getElementById('min-button').addEventListener("click", event => {
            require('electron').remote.getCurrentWindow().minimize();
        });

        document.getElementById('max-button').addEventListener("click", event => {
            require('electron').remote.getCurrentWindow().maximize();
        });

        document.getElementById('restore-button').addEventListener("click", event => {
            require('electron').remote.getCurrentWindow().unmaximize();
        });

        document.getElementById('close-button').addEventListener("click", event => {
            require('electron').remote.getCurrentWindow().close();
        });

        // Toggle maximise/restore buttons when maximisation/unmaximisation occurs
        toggleMaxRestoreButtons();
        require('electron').remote.getCurrentWindow().on('maximize', toggleMaxRestoreButtons);
        require('electron').remote.getCurrentWindow().on('unmaximize', toggleMaxRestoreButtons);

        function toggleMaxRestoreButtons() {
            if (require('electron').remote.getCurrentWindow().isMaximized()) {
                document.getElementById('max-button').style.display = 'none';
                document.getElementById('restore-button').style.display = 'flex';
            } else {
                document.getElementById('max-button').style.display = 'flex';
                document.getElementById('restore-button').style.display = 'none';
            }
        }
    }
}