package com.br.maskotes.loja.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import com.br.maskotes.loja.entitites.Pagamento;
import com.br.maskotes.loja.repository.PagamentoRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class PagamentoServiceImpl implements PagamentoService {
    private final PagamentoRepository pagamentoRepository;

    @Override
    public List<Pagamento> listAll() {
        return pagamentoRepository.findAll();
    }

   @Override
public Pagamento listOne(@PathVariable Long id) {
    if (id != null) {
        return pagamentoRepository.findById(id).orElse(null);
    } else {
        throw new IllegalArgumentException("O ID não pode ser nulo.");
    }
}


    @Override
    @Transactional
    public Pagamento create(Pagamento pagamento) {
         if(pagamento.getId() != null){
            throw new RuntimeException("Nao é possivel inserir ja com id");
        }
        return pagamentoRepository.save(pagamento);
    }

    @Override
    @Transactional
    public Pagamento update(Pagamento pagamento) {
        if(pagamento.getId()==null){
            throw new RuntimeException("Para atualizar uma entidade, ela precisa ter id");
        } 
        return pagamentoRepository.save(pagamento);   
      }

      @Override
      public void delete(Long id) {
          if (id != null) {
              pagamentoRepository.deleteById(id);
          } else {
              throw new IllegalArgumentException("O ID não pode ser nulo.");
          }
      }
      
    
}
