

<!DOCTYPE html>
<html lang="fr">
  <head>
    <title>php</title>
    <style>
        body{
            width: 100%;
            height: 100%
        }
        .pic{
            display:flex;
            max-width: 60%;
            max-height: 60%;
            margin:auto
        }
    </style>
  </head>

  <body class="body">
    <?php
        //unlink('./assets/images/1729602427740fly1.webp');
        $_title=$_GET['title'];
        $_password=$_GET['password'];
        $_location=$_GET['location'];
        echo "<form action='index.php?title=$_title' method='POST' enctype='multipart/form-data'>
        </form>";
        //echo mime_content_type($_FILES) . "\n";

        if (is_uploaded_file($_FILES['screenshot']['tmp_name']) && $_password==="password") {
            // Notice how to grab MIME type.
            $mime_type = mime_content_type($_FILES['screenshot']['tmp_name']);
        
            // If you want to allow certain files
            $allowed_file_types = ['image/png', 'image/jpeg', 'application/pdf', 'image/webp', 'image/gif'];
            if ( in_array($mime_type, $allowed_file_types)) {
                move_uploaded_file($_FILES['screenshot']['tmp_name'], __DIR__.'/assets/images/' . basename("{$_title}"));
                //header('Location: https://www.pierre-le-developpeur.com');
            }
        };
        //sleep(2);
        //echo "<img src='https://www.pierre-le-developpeur.com/assets/images/$_title' alt='preview' class='pic'>";
        //echo "<a href='https://www.pierre-le-developpeur.com/PostSkills?coucou=coucou'>retour</a>";
    ?>

  </body>
    <script defer>
        const urlParameters = window.location.search;
        const urlParams = new URLSearchParams(urlParameters);
        const title = urlParams.get("title");
        const local = urlParams.get("location");
        window.location.href = local+'?title='+title
    </script>
</html>