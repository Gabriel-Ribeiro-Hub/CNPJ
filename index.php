<?php include ("componentes/head.php"); ?>
</head>

<body>

    <main>

        <div id="loadingScreen" style="display: none;">
            <div class="loading-text"></div>
        </div>

        <div class="div-flex">
            <img src="imagens/Documents-bro.png" alt="">
            <div class="container">
                <h1 class="title">Qual CNPJ deseja <br> consultar ?</h1>
                <input type="text" id="cnpjInput" placeholder="Informe o CNPJ">
                <button class="button-one" id="consultaBtn">Consultar</button>

                <!-- Modal -->
                <div id="modal" class="modal hidden">
                    <div class="modal-content">
                        <span class="close">&times;</span>
                        <h2 class="title-modal">Informações da Empresa</h2>
                        <div class="div-flex2 green2"><img src="imagens/icon/1.png" alt="icon">
                            <p class="text-one"><strong class="strong-black">Nome:</strong> <span id="nome"></span></p>
                        </div>

                        <div class="div-flex2"><img src="imagens/icon/2.png" alt="icon">
                            <p class="text-one"><strong class="strong-black">Razão Social:</strong> <span
                                    id="razaoSocial"></span></p>
                        </div>

                        <div class="div-flex2 green2"><img src="imagens/icon/3.png" alt="icon">
                            <p class="text-one"><strong class="strong-black">Data de Abertura:</strong> <span
                                    id="dataAbertura"></span></p>
                        </div>

                        <div class="div-flex2"><img src="imagens/icon/4.png" alt="icon">
                            <p class="text-one"><strong class="strong-black">Situação:</strong> <span
                                    id="situacao"></span>
                            </p>
                        </div>

                        <div class="div-flex2 green2"><img src="imagens/icon/5.png" alt="icon">
                            <p class="text-one"><strong class="strong-black">Atividade Principal:</strong> <span
                                    id="atividadePrincipal"></span></p>
                        </div>

                        <div class="div-flex2"><img src="imagens/icon/6.png" alt="icon">
                            <p class="text-one"><strong class="strong-black">Endereço Completo:</strong> <span
                                    id="enderecoCompleto"></span></p>
                        </div>

                        <div class="div-flex2 green2"><img src="imagens/icon/7.png" alt="icon">
                            <p class="text-one"><strong class="strong-black">Telefone:</strong> <span
                                    id="telefone"></span>
                            </p>
                        </div>


                        <div class="div-flex2"><img src="imagens/icon/8.png" alt="icon">
                            <p class="text-one"><strong class="strong-black">E-mail:</strong> <span id="email"></span>
                            </p>
                        </div>

                        <h3 class="title-h3">Sócios</h3>
                        <div id="sociosContainer"></div>

                        <button id="editBtn">Editar</button>
                        <button id="saveBtn" class="hidden">Salvar</button>
                    </div>
                </div>
            </div>
        </div>

    </main>
    <script src="js/script.js"></script>
    <script src="js/animation.js"></script>
</body>

</html>