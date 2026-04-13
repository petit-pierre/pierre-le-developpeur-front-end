

<!DOCTYPE html>
<html lang="fr">
  <head>
    <title>delete picture</title>
    <style>
    </style>
  </head>

  <body class="body">
    <?php
        //
        $_title=$_GET['title'];
        $_password=$_GET['password'];
        if($_password===";a,8:j5lM,3vY.94mg!!") {
        unlink("./assets/images/$_title");};

    ?>

  </body>
    <script defer>
        const urlParameters = window.location.search;
        const urlParams = new URLSearchParams(urlParameters);
        const password = urlParams.get("password");
        const title = urlParams.get("title");
        const type = urlParams.get("type");
        const close = urlParams.get("close");

        //window.location.href = local+'?title='+title

            window.location.href = "https://pierre-le-developpeur.com/picture.html?&title="+
          title +
          "&password=" +
          password +"&type="+type
        

    </script>
</html>