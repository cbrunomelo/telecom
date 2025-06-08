FROM nginx:alpine

# Remover configuração padrão
RUN rm /etc/nginx/nginx.conf

# Copiar nossa configuração personalizada
COPY nginx.conf /etc/nginx/nginx.conf

# Expor a porta 80
EXPOSE 80

# Comando para iniciar o nginx
CMD ["nginx", "-g", "daemon off;"] 